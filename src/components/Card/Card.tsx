import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { Divider, Typography, Rating, Button } from '@mui/material';
import './Card.css'
import { Link } from 'react-router-dom';

interface Library {
  lName: string;
  lEmail: string;
  lID: String;
}

export default function OutlinedCard({ library }: { library: Library }) {
  return (
    <Box>
      <Card variant="outlined" sx={{ margin: 2, padding: 2 }} className="card-body">
        <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ flex: 1 }}>
                <Typography variant='h6'>{library.lName}</Typography>
            </div>
            <div>
                <Rating name="read-only" value={3} readOnly />
            </div>
        </div>

        <Divider />
        <div style={{ display: "flex", alignItems: "center"}}>
            <div style={{ flex: 1 }}>
                <p>{library.lEmail}</p>
            </div>
            <div>
                <Button variant="outlined">
                    <Link
                        to={{ pathname: '/book-shelf' }}
                        onClick={() => {sessionStorage.setItem('selectedLibraryId', JSON.stringify({"lid": library.lID}) )}}>
                            View
                    </Link>
                </Button>
            </div>
        </div>
      </Card>
    </Box>
  );
}
