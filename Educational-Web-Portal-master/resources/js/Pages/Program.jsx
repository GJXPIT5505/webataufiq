import React from 'react';
import EventIndex from './Event';

export default function ProgramIndex(props) {
    return (
        <EventIndex 
            {...props} 
            title="Program Pendidikan"
            subtitle="Mengenal lebih dekat berbagai program pendidikan unggulan dan pembentukan karakter Islami di SIT At-Taufiq."
            tagline="PROGRAM UNGGULAN ATTAUFIQ"
        />
    );
}