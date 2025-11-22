export function injectCommand(commandLine: string) {
  const terminalInput = eval('document').getElementById("terminal-input");
  terminalInput.value = commandLine;
  const handler = Object.keys(terminalInput)[1];
  terminalInput[handler].onChange({ target: terminalInput });
  terminalInput[handler].onKeyDown({ key: 'Enter', preventDefault: () => null });
}