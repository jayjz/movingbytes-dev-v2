(() => {
    'use strict';

    // Inputs are the synthetic selective-risk fixture at TEMPER 0747730.
    // Read them from the static illustration; no inference or network requests.
    const instrument = document.querySelector('[data-threshold-instrument]');
    if (!instrument) return;
    const slider = instrument.querySelector('input');
    const samples = [...instrument.querySelectorAll('[data-confidence]')];
    const percent = value => `${Number((value * 100).toFixed(1))}%`;

    function update() {
        const threshold = Number(slider.value);
        let accepted = 0;
        let errors = 0;
        samples.forEach(sample => {
            const keep = Number(sample.dataset.confidence) >= threshold;
            sample.dataset.accepted = String(keep);
            sample.querySelector('.sample-admission').textContent = keep ? 'Accepted' : 'Deferred';
            if (keep) {
                accepted++;
                if (sample.dataset.correct === 'false') errors++;
            }
        });
        instrument.querySelector('#threshold-value').value = threshold.toFixed(2);
        instrument.querySelector('[data-coverage]').textContent = percent(accepted / samples.length);
        instrument.querySelector('[data-risk]').textContent = accepted ? percent(errors / accepted) : 'Undefined';
        instrument.querySelector('.instrument-summary').textContent = accepted
            ? `At threshold ${threshold.toFixed(2)}, ${accepted} of ${samples.length} decisions are accepted; ${errors} accepted ${errors === 1 ? 'decision is' : 'decisions are'} incorrect.`
            : `At threshold ${threshold.toFixed(2)}, no decisions are accepted. Coverage is 0%; selective risk is undefined.`;
    }

    slider.addEventListener('input', update);
    update();
    instrument.querySelector('.instrument-controls').hidden = false;
})();
