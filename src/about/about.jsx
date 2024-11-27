import React from 'react';
import './about.css';

export function About() {

  const [imageUrl, setImageUrl] = React.useState('data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=');
  const [quote, setQuote] = React.useState('Loading...');
  const [quoteAuthor, setQuoteAuthor] = React.useState('unknown');

  // We only want this to render the first time the component is created and so we provide an empty dependency list.
  React.useEffect(() => {
    const random = Math.floor(Math.random() * 1000);
    fetch(`https://picsum.photos/v2/list?page=${random}&limit=1`)
      .then((response) => response.json())
      .then((data) => {
        const containerEl = document.querySelector('#picture');

        const width = containerEl.offsetWidth;
        const height = containerEl.offsetHeight;
        const apiUrl = `https://picsum.photos/id/${data[0].id}/${width}/${height}?grayscale`;
        setImageUrl(apiUrl);
      })
      .catch();

    fetch('https://quote.cs260.click')
      .then((response) => response.json())
      .then((data) => {
        setQuote(data.quote);
        setQuoteAuthor(data.author);
      })
      .catch();
  }, []);

  return (
    <main className="min-vh-100 mb-5">
        <div className="d-flex justify-content-center m-3">
            <p className="text-secondary">
                    Braxten Chenay is a Software Engineering Student studying<br/>
                    at BYU! If you have any questions about the software, feel free to<br/>
                    reach out at braxten5@byu.edu.
            </p>
        </div>
        <div className="d-flex justify-content-center m-3">
            <img className="rounded border border-3" alt="Image of Braxten Chenay" src="../../braxtenchenay.jpg" width="400" height="500" />
        </div>
        <div className='text-secondary d-flex justify-content-center m-3'>
          <p className='quote'>{quote}</p>
          
        </div>
        <div className='text-secondary d-flex text-center justify-content-center m-3'>
          <p className='author'>{quoteAuthor}</p>
        </div>
    </main>
  );
}  