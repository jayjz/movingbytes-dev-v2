"""Run from an exported AetherForge 265c267 tree, with its Python dependencies.

No server source changes. Isolate optional physical imports/monitoring; remove
mock sleep and randomness. The real mock apply_strategy and real routes run.
"""
import asyncio
import json
import os
from pathlib import Path
import sys
import types
from unittest.mock import patch

os.environ["AETHER_ENGINE"] = "mock"
os.environ["AETHER_CHAOS"] = "false"
sys.path.insert(0, os.getcwd())

physical = types.ModuleType("llama_cpp")
def unavailable(*args, **kwargs):
    raise AssertionError("Physical engine must not run")
physical.Llama = unavailable
sys.modules["llama_cpp"] = physical

from fastapi.testclient import TestClient
from src import hardware_monitor
hardware_monitor.HAS_NVML = False
from src.server import app, settings

records = []
with patch("src.engines.mock_engine.random.random", return_value=0.5), \
     patch("src.engines.mock_engine.random.uniform", return_value=0.0), \
     patch("src.engines.mock_engine.time.sleep", return_value=None):
    for name, output, thermal, queue in [
        ("baseline", 2000, False, False),
        ("short", 5, False, False),
        ("thermal", 2000, True, False),
        ("queue", 2000, False, True),
    ]:
        with TestClient(app) as client:
            state = app.state.hypervisor
            state.emergency_thermal_lock = thermal
            if queue:
                async def fill():
                    for _ in range(settings.max_queue_depth):
                        await state.semaphore.acquire()
                client.portal.call(fill)
            payload = dict(mode="high_fidelity", estimated_context_tokens=100,
                           expected_output_tokens=output)
            response = client.post("/system/strategy", json=payload)
            body = response.json()
            expected = {
                "baseline": (200, {"status": "strategy_applied", "active_mode": "high_fidelity"}),
                "short": (200, {"status": "rejected", "error": "roi_negative", "active_mode": "balanced"}),
                "thermal": (503, {"detail": {"error": "thermal_lock_active", "temp_c": 45, "retry_after_seconds": 10}}),
                "queue": (503, {"detail": {"error": "queue_saturated", "queue_depth": 5, "retry_after_seconds": 2}}),
            }[name]
            assert (response.status_code, body) == expected
            assert state.current_strategy == ("high_fidelity" if name == "baseline" else "balanced")
            records.append(dict(
                id=name, request=payload, thermal_lock=thermal,
                available_slots=0 if queue else settings.max_queue_depth,
                context_ceiling=settings.max_safe_context_tokens,
                stay_seconds=output / settings.tps_balanced,
                switch_seconds=settings.swap_penalty_seconds + settings.state_io_base_seconds
                    + 100 * settings.state_io_per_token_seconds + output / settings.tps_high_fidelity,
                economic_gate_evaluated=not (thermal or queue),
                http_status=response.status_code, response=body,
                retry_after=response.headers.get("retry-after"), active_mode=state.current_strategy))
    import pytest
    test_result = pytest.main(["-q", "-p", "no:cacheprovider", "tests/test_hypervisor.py"])
    assert test_result == 0

Path(sys.argv[1]).write_text(json.dumps({
    "source_commit": "265c26769eba257ac40540a7e1da5378d7515532",
    "configured_estimates": {"balanced_tps": settings.tps_balanced,
        "high_fidelity_tps": settings.tps_high_fidelity,
        "swap_seconds": settings.swap_penalty_seconds,
        "io_base_seconds": settings.state_io_base_seconds,
        "io_seconds_per_token": settings.state_io_per_token_seconds},
    "cases": records, "existing_tests": "5 passed under documented isolation"
}, indent=2) + "\n")
