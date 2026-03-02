import React from "react";

//type CharacterStatus = "active" | "inactive" | "open" | "close";

interface CharacterProps{
    character: string;
    status?: string;
    //status?: CharacterStatus;
}

export const Character: React.FC <CharacterProps>= ({character}) =>{
    console.log(character)
    // const handleClick = (event: React.MouseEvent) =>{
    //     console.log(event.type);
    // };

    return (
    <>  
        <div>
            <i>
                {character} 
                  
            </i>
            {/* <button onClick={handleClick}>Change text</button> */}
        </div>
        
    </>
)}