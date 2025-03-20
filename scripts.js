document.querySelectorAll('.painting, .statue').forEach(item => {
    item.addEventListener('click', function() {
        const title = item.getAttribute('data-title');
        const description = item.getAttribute('data-description');
        const audioSrc = item.getAttribute('data-audio');
        
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
