document.getElementById("presentation-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const topic = document.getElementById("topic").value;
    const numSlides = document.getElementById("numSlides").value;
    const resultDiv = document.getElementById("result");

    try {
        const response = await fetch("http://localhost:3000/generate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ topic, numSlides }),
        });

        console.log("Response:", response); // Add this line
        console.log("Response status:", response.status); // Add this line

        if (response.ok) {
            const presentationUrl = await response.text();
            resultDiv.innerHTML = `<p style='color:white'>Presentation generated successfully! <a href="${presentationUrl}" target="_blank" style='color:#37ab80'>Click here to view your presentation</a></p>`;
        } else {
            throw new Error("Failed to generate presentation.");
        }
    } catch (error) {
        resultDiv.innerHTML = `<p style='color:white'>Error: ${error.message}</p>`;
    }
});
