function generateJSON() {
   const selectedLanguage = document.getElementById("language").value;
   const version = selectedLanguage.split('-')[1] || "";
   const language = selectedLanguage.split('-')[0] || "";
   const codeContent = document.getElementById("codeInput").value;
   const fileExtension = language == 'python'?'py':"";
   
   const jsonObject = {
       "language": language,
       "version": version,
       "files": [
           {
               "name": `my_cool_code.${fileExtension}`,
               "content": codeContent
           }
       ],
       "stdin": "",
       "args": [],
       "compile_timeout": 10000,
       "run_timeout": 3000,
       "compile_memory_limit": -1,
       "run_memory_limit": -1
   }

   const jsonOutput = document.getElementById("jsonOutput");
   let payload = JSON.stringify(jsonObject, null, 2);
   
    fetch("http://localhost:2000/api/v2/execute",{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: payload,
    }).then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    }).then(data => {
        jsonOutput.value = data['run'].stdout;
    })
}