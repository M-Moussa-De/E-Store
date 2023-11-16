import { Alert, AlertTitle, Button, ButtonGroup, Container, List, ListItem, ListItemText, Typography } from "@mui/material";
import agent from "../../app/api/agent";
import { useState } from "react";

export default function AboutPage() {
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const getValidationError = () => {
      agent.TestErrors.getValidationError()
      .then(() => console.log('Should not see this'))
      .catch(error => setValidationErrors(error))
  } 

  const catchFun = (error: object) => process.env.NODE_ENV === "development" ? console.log(error) : null
  
  return (
    <Container>
      <Typography variant='h5' gutterBottom>Errors for testing purposes</Typography>
      <ButtonGroup fullWidth>
        <Button variant="contained" onClick={() => agent.TestErrors.get400Error().catch(error => catchFun(error))}>Test 400 error</Button>
        <Button variant="contained" onClick={() => agent.TestErrors.get401Error().catch(error => catchFun(error))}>Test 401 error</Button>
        <Button variant="contained" onClick={() => agent.TestErrors.get404Error().catch(error => catchFun(error))}>Test 404 error</Button>
        <Button variant="contained" onClick={() => agent.TestErrors.get500Error().catch(error => catchFun(error))}>Test 500 error</Button>
        <Button variant="contained" onClick={getValidationError}>Test validation error</Button>
      </ButtonGroup>

      {validationErrors.length > 0 && 
      <Alert severity='error'>
        <AlertTitle>Validation Errors</AlertTitle>
        <List>
          {validationErrors.map(error =>
           <ListItem key='error'>
            <ListItemText>{error}</ListItemText>
           </ListItem>  
          )}
        </List>
      </Alert>
      }
    </Container>
  )
}
