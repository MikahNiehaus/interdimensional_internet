function Page({ title, content, goBack }) {
    return (
      <div className="page-container">
        <button className="back-button" onClick={goBack}>← Back to Website</button>
        <h1>{title}</h1>
        <p>{content}</p>
      </div>
    );
  }
  
  export default Page;
  