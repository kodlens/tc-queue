const PanelSideBarLogo = ( { collapse } : { collapse?:boolean }) => {
  return (
    <div className="demo-logo-vertical my-10 mx-4">
        <img width="150s" className='mx-auto' src="/img/tc-logo.png"></img>

        { !collapse && <div className='hidden md:block text-center text-white font-bold text-xl'>
            TANGUB CITY QUEUE MANAGEMENT SYSTEM
        </div> }

    </div>
  )
};


export default PanelSideBarLogo;
