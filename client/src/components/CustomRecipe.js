import React, { useState } from 'react';

function CustomRecipe() {
  const [text, setText] = useState('');
  const [recipe, setRecipe] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    fetch('/openai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: text }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Data successfully sent:', data);
        setRecipe(data.data);
      })
      .catch(error => {
        console.error('Error sending data:', error);
      });
  }

  function handleTextChange(event) {
    setText(event.target.value);
  }

  function renderRecipe() {
    const lines = recipe.split('\n').filter(line => line.trim() !== '');
  
    return (
      <div>
        {lines.map((line, index) => (
          <p key={index}>
            {line}{index < lines.length - 1 && <br />}
          </p>
        ))}
      </div>
    );
  }
  
  

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Input:
          <input type="text" value={text} onChange={handleTextChange} />
        </label>
        <button type="submit">Submit</button>
      </form>
      {recipe && (
        <div>
          <h2>Recipe:</h2>
          {renderRecipe()}
        </div>
      )}
    </div>
  );
}

export default CustomRecipe;
