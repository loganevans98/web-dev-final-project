import React from 'react';

const Marketplace = () => {
    return (
        <div>
            <h1>Marketplace </h1>
            <h4>List a book</h4>
            <input className="form-control" placeholder="Book Title" type={"text"}></input>
            <input className="form-control" placeholder="Price" type={"number"}></input>
            <input className="form-control" placeholder="Price" type={"number"}></input>
            <button>Post</button>

            <h4>Buy a book</h4>
        </div>
    );
};

export default Marketplace;