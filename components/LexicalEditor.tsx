


import React, { useRef } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { WebView } from 'react-native-webview';

interface LexicalEditorProps {
  onShare: (content: string) => void;
}

export default function LexicalEditor({ onShare }: LexicalEditorProps) {
  const webViewRef = useRef<WebView>(null);

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 10px; background: #f5f5f5; }
        #editor {
          border: 1px solid #ccc;
          padding: 15px;
          min-height: 300px;
          background: white;
          outline: none;
        }
        .toolbar {
          display: flex;
          gap: 8px;
          margin-bottom: 5px;
          flex-wrap: wrap;
        }
        button, select {
          padding: 5px 10px;
          cursor: pointer;
          border: 1px solid #ccc;
          background-color: #f0f0f0;
          border-radius: 4px;
        }
        button.active {
          background-color: #d0d0d0;
          font-weight: bold;
        }
      </style>
    </head>
    <body>
      <div class="toolbar">
        <button onclick="formatText('bold', this)">B</button>
        <button onclick="formatText('italic', this)">I</button>
        <button onclick="formatText('underline', this)">U</button>
        <button onclick="formatText('strikeThrough', this)">S</button>
        
        <select onchange="changeColor(this.value)">
          <option value="" disabled selected>Text Color</option>
          <option value="red">Red</option>
          <option value="blue">Blue</option>
          <option value="green">Green</option>
          <option value="black">Black</option>
        </select>

        <select onchange="highlightText(this.value)">
          <option value="" disabled selected>Highlight</option>
          <option value="yellow">Yellow</option>
          <option value="lightblue">Light Blue</option>
          <option value="lightgreen">Light Green</option>
          <option value="none">Disable Highlight</option> <!-- New Option -->
        </select>

        <button onclick="alignText('left')">Left</button>
        <button onclick="alignText('center')">Center</button>
        <button onclick="alignText('right')">Right</button>
      </div>

      <div id="editor" contenteditable="true">Type here...</div>

    <script>
  const editor = document.getElementById('editor');
  const buttons = document.querySelectorAll('.toolbar button');
  const selects = document.querySelectorAll('.toolbar select');

  function formatText(command, button) {
    editor.focus();
    document.execCommand(command, false, null);
    button.classList.toggle('active'); // Toggle active state
  }

  function changeColor(color) {
    editor.focus();
    document.execCommand('foreColor', false, color);
  }

  function highlightText(color) {
    editor.focus();
    if (color === 'none') {
      document.execCommand('hiliteColor', false, 'white'); 
    } else {
      document.execCommand('hiliteColor', false, color);
    }
  }

  function alignText(align) {
    editor.focus();
    document.execCommand('justify' + align.charAt(0).toUpperCase() + align.slice(1));
  }

  function resetFormatting() {
    
    buttons.forEach(button => button.classList.remove('active'));
    selects.forEach(select => select.selectedIndex = 0);
  }

  function getContent() {
    window.ReactNativeWebView.postMessage(editor.innerHTML);
    editor.innerHTML = '';  // Clear the content
    resetFormatting();      // Reset all formatting states
  }
</script>

    </body>
    </html>
  `;

  const handleMessage = (event: any) => {
    onShare(event.nativeEvent.data);
  };

  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
        originWhitelist={['*']}
        source={{ html: htmlContent }}
        onMessage={handleMessage}
        style={styles.webView}
      />
      <View className='mt-5'>
      <Button title="Share Post" onPress={() => webViewRef.current?.injectJavaScript('getContent();')} /></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: '#fff',
  },
  webView: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
  },
});

