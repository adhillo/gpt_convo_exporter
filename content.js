function extractTextFromElement(element) {
    let text = '';
  
    for (const child of element.childNodes) {
      if (child.nodeType === Node.TEXT_NODE) {
        text += child.textContent;
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        if (child.tagName === 'CODE') {
          text += '```\n' + child.textContent + '\n```\n';
        } else {
          text += extractTextFromElement(child);
        }
      }
    }
  
    return text.replace('1 / 1', '').trim();
  }
  
  chrome.runtime.onMessage.addListener(function (request) {
    console.log('content.js: onMessage');
    if (request.exportMode) {
      exportConversation(request.exportMode);
    }
  });
  
  function exportConversation(exportMode) {
    const messages = document.querySelectorAll('.text-base');
    let conversationText = '';
    let isUserMessage = true;
  
    console.log(messages);
  
    messages.forEach(message => {
      const messageText = extractTextFromElement(message);
  
      if (
        (exportMode === 'full') ||
        (exportMode === 'user' && isUserMessage) ||
        (exportMode === 'chatgpt' && !isUserMessage)
      ) {
        const label = isUserMessage ? '😃 User:' : '🤖 ChatGPT:';
        conversationText += label + ' ' + messageText + '\n\n';
      }
  
      isUserMessage = !isUserMessage;
    });
  
    const blob = new Blob([conversationText], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'conversation.txt';
    link.click();
  }