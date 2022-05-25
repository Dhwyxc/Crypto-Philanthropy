function fallbackCopyTextToClipboard(text, onSuccess, onError) {
  const textArea = document.createElement("textarea");
  textArea.value = text;

  // Avoid scrolling to bottom
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    const successful = document.execCommand("copy");
    const msg = successful ? "successful" : "unsuccessful";
    successful ? onSuccess?.() : onError?.();
    // console.log("Fallback: Copying text command was " + msg);
  } catch (err) {
    onError?.(err);
    // console.error("Fallback: Oops, unable to copy", err);
  }

  document.body.removeChild(textArea);
}
export function copyTextToClipboard(text, onSuccess, onError) {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text);
    return;
  }
  navigator.clipboard.writeText(text).then(
    function () {
      onSuccess?.();
      //   console.log("Async: Copying to clipboard was successful!");
    },
    function (err) {
      onError?.(err);
      //   console.error("Async: Could not copy text: ", err);
    }
  );
}
