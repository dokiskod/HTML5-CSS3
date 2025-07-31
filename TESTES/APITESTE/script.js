const questionInput = document.getElementById('inputText');
const responseDiv = document.getElementById('response');


async function chamadaApi(url,question) {
    const resposta = await fetch (url,
        {
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(
                {contents:[
                    {
                        parts:[
                            {
                                text:question
                            }
                        ]
                    }
                ]} 
            )
        }
    ) 
    data = await resposta.json()
    return data.candidates[0].content.parts[0].text;
}



document.getElementById("button").addEventListener("click", async function(event) {
    event.preventDefault();
    const apiKey = "AIzaSyDSVcbh2-U41-lhU-f7jQQSvyaAiyJUcRw";
    let url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + apiKey;
    const question = questionInput.value;
    const resposta = await chamadaApi(url, question);
    document.getElementById("response").innerHTML = resposta;

});