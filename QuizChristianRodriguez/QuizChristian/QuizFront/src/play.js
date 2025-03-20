const jugar = await fetch('http://localhost:1803/api/v1.0/4raya/init/play', {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body:JSON.stringify({
        'ficha': 'x',
        'x': 3,
        'y':2
    })
    
});