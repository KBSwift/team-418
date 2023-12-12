export default function Login() {
    
    const handleSubmit = (event) => {
       alert("Form submitted");
       event.preventDefault();
    }

    return (
        <div className='App'>
            <form onSubmit={handleSubmit}>
                <div className="formInfo">
                    <label>
                        Name:
                        <input type="text" />
                    </label>
                </div>
                <div className="formInfo">
                    <label>
                        Email:
                        <input type="email" />
                    </label>
                </div>
                <div className="formInfo">
                    <label>
                        Password:
                        <input type="password" />
                    </label>
                </div>
                <div className="formInfo">
                    <label>
                        Mobile # (Opt.):
                        <input type="number" />
                    </label>
                </div>
                    <input type="submit" value="Submit" />
            </form>
        </div>
    );
}