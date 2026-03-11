import './Branding.css'

const Branding = () => {
    return (
        <section className="brand-col">
            <div className="brand-logo">
                <p className="brand-logo-icon">M</p>
                <span className="brand-logo-text">Chats</span>
            </div>

            <p className="brand-tagline">
                Connect.<br/><span>Chat.</span><br/>Collaborate.
            </p>

            <p className="brand-sub-text">
                Your workspace for real-time conversations, file sharing, and team meetings — all in one beautiful
                dark space.
            </p>

            <div className="chat-preview">
                <div className="preview-header">
                    <p className="preview-avatar">B</p>
                    <div>
                        <p className="preview-name">Brooklyn Simmons</p>
                        <p className="preview-status">● Online</p>
                    </div>
                </div>

                <p className="preview-bubble bubble-in">Hey! Working on the AD project 👋</p>
                <p className="preview-bubble bubble-out">Same here! Been at it for 5 hours 🔥</p>
                <p className="preview-bubble bubble-in">Nice! It looks amazing ✨</p>
            </div>
        </section>
    )
}

export default Branding