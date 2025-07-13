(function() {
    'use strict';

    function getColor() {
        return Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    }

    const token = localStorage.getItem('vanisToken');
    const perkName = localStorage.getItem('nickname');
    const delay = 1000; 
    let isStarted = true;

    let k = 0;
    while (k < 10){
        k = k+1;
        sendRequest(perkName, delay);
    }


    async function sendRequest(perkName, delay){
        const URL = 'https://vanis.io/api/me/perks';

        const headers = {
            'authorization': `Vanis ${token}`,
            'content-type': 'application/json',
            'user-agent': navigator.UserAgent
        };

        const randomColor = getColor();
        const payload = {
            "perk_name_picked": perkName,
            "perk_color_picked": randomColor
        };
        while (isStarted){
            try {
                await fetch(URL, {
                    method: 'PATCH',
                    headers: headers,
                    body: JSON.stringify(payload)
                });
            } catch (error) {
                //Shhhh...
            }
    
            await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    
    window.onerror = () => true;
})();
