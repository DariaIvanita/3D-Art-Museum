document.querySelectorAll('.explore-btn').forEach(button => {
    button.addEventListener('click', function() {
        const painting = button.closest('.painting, .statue'); // Get the closest painting or statue div
        const title = painting.getAttribute('data-title');
        const description = painting.getAttribute('data-description');
        const audioSrc = painting.getAttribute('data-audio');
        
        document.getElementById('painting-title').textContent = title;
        document.getElementById('painting-description').textContent = description;
        
        const audioPlayer = document.getElementById('audio-player');
        const audioSource = document.getElementById('audio-source');
        audioSource.src = audioSrc;
        
        // Load and play audio
        audioPlayer.load();
        audioPlayer.play();
    });
});

