import React from 'react'
import HelpCenterIcon from '@mui/icons-material/HelpCenter';

type HelpButtonProps = {
    setHelp: (b:boolean)=> void
}
export function HelpButton(props:HelpButtonProps){
    return (
        <div className='help-menu-wrapper'>
            <HelpCenterIcon aria-label = {'help icon'} color={'primary'} sx={{fontSize:75}} onClick ={() => props.setHelp(true)}/>
        </div>
    )
}