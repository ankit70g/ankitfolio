import React from 'react';

const Help = () => (
  <div className="mb-2">
    <p>Available commands:</p>
    <ul className="ml-4">
      <li>{'>'} about - Learn more about me</li>
      <li>{'>'} skills - View my technical skills</li>
      <li>{'>'} projects - See my projects</li>
      <li>{'>'} contact - Get my contact information</li>
      <li>{'>'} theme - Change the terminal theme (try: theme list, theme [name])</li>
      <li>{'>'} clear - Clear the terminal</li>
      <li>{'>'} help - Show this help message</li>
      <li>{'>'} quote -  Get a random quote for inspiration</li>
      <li>{'>'} blog - Read my latest thoughts and articles</li>
      {/* <li>{'>'} joke - Get a random joke from Gemini AI</li> */}
      <li>
        {'>'} games - Play terminal games (try: <code>games tictactoe</code>, <code>games guess</code>, <code>games rps</code>)
      </li>
      {/* <li>{'>'} games - Discover and play interactive terminal games (rps, guess, snake)</li> */}
      {/* <li>{'>'} gen - Generate content based on prompt (try: gen [prompt])</li>
      <li>{'>'} imagine - Generate an image based on prompt (try: imagine [prompt])</li> */}
    </ul>
  </div>
);

export default Help;