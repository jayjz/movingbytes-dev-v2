"""Supplementary offline inspection probes; not part of CipherLoop's test suite.

Run from the recorded CipherLoop checkout using its isolated Python environment.
No model invocation, Docker command, or fixture execution occurs.
"""
import json
from pathlib import Path
from unittest.mock import patch
from types import SimpleNamespace
from langchain_core.messages import AIMessage, ToolMessage
from langgraph.graph.message import add_messages
from cipherloop.executor.compressor import compressor_node, process_semgrep_output
from cipherloop.executor.validator import find_taint_trace, validator_node
from cipherloop.tools.fallback_tool import run_fallback_scanner

positive = Path('fixtures/toy/app.py').read_text()
negative = Path('fixtures/safe/app.py').read_text()
trace = find_taint_trace(positive, 'app.py', 10)
assert trace is not None
assert find_taint_trace(negative, 'app.py', 11) is None
messages = add_messages([], [
    AIMessage(content='', tool_calls=[{'name': 'run_semgrep', 'args': {}, 'id': 'call-1'}]),
    ToolMessage(content='{"results": []}', name='run_semgrep', tool_call_id='call-1'),
])
sweep = compressor_node({'messages': messages})
remaining = add_messages(messages, sweep['messages'])
assert remaining == []
# The state annotation uses operator.add for this field, not replacement.
from operator import add
batches = add(sweep['compressed_findings'], sweep['compressed_findings'])

with patch('cipherloop.tools.fallback_tool.execute_in_sandbox', return_value='app.py:10:subprocess.run(command)'):
    fallback = run_fallback_scanner('.', original_error='synthetic primary failure')
compressed_fallback = process_semgrep_output(json.dumps(fallback))
assert len(fallback['results']) == 1
assert compressed_fallback['top_findings'] == []
error_payload = {'results': [], 'errors': [{'message': 'synthetic fallback failure'}], 'fallback_used': True}
compressed_error = process_semgrep_output(json.dumps(error_payload))
assert 'errors' not in compressed_error and not compressed_error['top_findings']

# Candidate revalidation uses the entire accumulated batch list.
state = {'compressed_findings': [{'top_findings': ['[ERROR] app.py:10 - Command injection']}], 'verified_findings': []}
with patch('cipherloop.executor.validator.read_file', SimpleNamespace(invoke=lambda _: positive)):
    first = validator_node(state)
    state['verified_findings'] = first['verified_findings']
    second = validator_node(state)
assert first['verified_findings'][0]['id'] == second['verified_findings'][0]['id']

syntax_probes = {
    'shell_false_list_argument': "import subprocess\nx = input()\nsubprocess.run(['echo', x], shell=False)\n",
    'sanitizer_not_modeled': "import os, shlex\nx = input()\nos.system(shlex.quote(x))\n",
    'aliased_sink_not_resolved': "from subprocess import run\nx = input()\nrun(x)\n",
    'cross_function_flow_not_resolved': "import os\ndef source():\n    return input()\nx = source()\nos.system(x)\n",
}
print(json.dumps({
    'kind': 'supplementary offline probes; mocks noted in script',
    'fixture_source': trace.source, 'fixture_sink': trace.sink, 'fixture_path': trace.path,
    'safe_fixture_trace': None,
    'messages_before_sweep': len(messages), 'messages_after_reducer': len(remaining),
    'batches_after_two_appends': len(batches),
    'fallback_results_before_compression': len(fallback['results']),
    'fallback_candidates_after_compression': len(compressed_fallback['top_findings']),
    'structured_error_preserved_by_compressor': 'errors' in compressed_error,
    'same_candidate_emitted_on_second_validation': first['verified_findings'][0]['id'] == second['verified_findings'][0]['id'],
    'ast_pattern_matches_not_exploitability': {name: find_taint_trace(code, name + '.py') is not None for name, code in syntax_probes.items()},
}, indent=2))
