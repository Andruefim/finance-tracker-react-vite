import React from 'react';
import { Box, Card, CardContent, CardHeader, Stack, styled, Typography } from '@mui/material';

const StyledCard = styled(Card)(({ theme }) => ({
    padding: theme.spacing(2, 4),
    maxWidth: 400,
    width: '100%',
    margin: 'auto',
}));

interface AuthCardProps extends React.PropsWithChildren {
    title: string;
}

const AuthCard = ({ title, children }: AuthCardProps) => {
    return (
        <StyledCard>
            <CardContent>
                <Stack gap={4}>
                    <Typography variant='h5'>{title}</Typography>
                    {children}
                </Stack>
            </CardContent>
        </StyledCard>
    )
}

export default AuthCard;