document.querySelectorAll('.boxInput input').forEach(input => {
    input.addEventListener('input', function() {
        if (this.value !== '') {
            this.classList.add('has-content');
        } else {
            this.classList.remove('has-content');
        }
    });
});
