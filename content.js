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
  
  function exportConversation() {
    const messages = document.querySelectorAll('.text-base');
    let conversationText = '';
    let isUserMessage = true;
  
    messages.forEach(message => {
      const messageText = extractTextFromElement(message);
      const label = isUserMessage ? 'User:' : 'ChatGPT:';
      conversationText += label + ' ' + messageText + '\n\n';
      isUserMessage = !isUserMessage;
    });
  
    const blob = new Blob([conversationText], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'conversation.txt';
    link.click();
  }
  
  exportConversation();
  