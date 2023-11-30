import React, { useState } from "react";
import axios from "axios";
import useToken from "../../hooks/useToken";
import "./create.scss";
import "./";
import { useAlert } from 'react-alert';
import { useNavigate } from "react-router-dom";
import { Form, Container, Col, Row, FormControl } from "react-bootstrap";


export default function Create(props) {
  const userIdToken = useToken();
  const user_id = userIdToken.token;
  const [category, setCategory] = useState(props.category|| 0);
  const [recName, setrecName] = useState(props.name || "");
  const [description, setDescription] = useState(props.description || "");
  const [ingredients, setIngredients] = useState(props.ingredients || "");
  const [steps, setSteps] = useState(props.steps || "");
  const [servings, setServings] = useState(props.serving || "");
  const [time, setTime] = useState(props.time || "");
  const likes = 0;
  const [image, setImage] = useState(props.image || "");
  const [message, setMessage] = useState("");
  let navigate = useNavigate();
  
  const handleSubmit = (
    user_id,
    recName,
    category,
    description,
    ingredients,
    steps,
    servings,
    time,
    likes,
    image
  ) => {
    
    let data = {
      user_id: user_id,
      name: recName,
      category: category,
      description: description,
      ingredients: ingredients,
      steps: steps,
      servings: servings,
      time: time,
      likes: likes,
      image: image,
    };

    axios
      .post(`users/${user_id}/recipes`, { ...data })
      .then (res => {
        if(res.data) {
          alert.show('Recipe created and saved in your profile 🙌🏼')
          setMessage('Recipe created and saved in your profile 🙌🏼');
          navigate(`/SingleRecipe`, { state: res.data })
        } else {
          setMessage('Something went wrong! Could not create recipe.')
        }
      })
  };
  
  const alert = useAlert()
  
 
  return (
    <div>
      <section className="recipe-create-section">
        <Container>
          <Row>
            <Col></Col>
            <Col>
              <h2>Create Recipe</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb- 3">
                  <Form.Label>Recipe Name:</Form.Label>
                  <Form.Control
                    type="text"
                    name={props.name}
                    required
                    value={recName}
                    onChange={(e) => setrecName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Category:</Form.Label>
                  <Form.Select
                    name={props.category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">--Please choose an option--</option>
                    <option value="1">Breakfast </option>
                    <option value="2">Lunch</option>
                    <option value="3">Dinner</option>
                    <option value="4">Personal Care</option>
                    <option value="5">Other For Food</option>
                    <option value="6">Kids</option>
                    <option value="7">Other Things</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group>
                  <Form.Label> Description:</Form.Label>
                  <FormControl
                    as="textarea"
                    aria-label="With textarea"
                    type="text"
                    name="description"
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label> Ingredients:</Form.Label>
                  <Form.Control
                    as="textarea"
                    aria-label="With textarea"
                    type="text"
                    name={props.ingredients}
                    required
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label> Steps:</Form.Label>
                  <Form.Control
                    as="textarea"
                    aria-label="With textarea"
                    type="text"
                    name="steps"
                    required
                    value={steps}
                    onChange={(e) => setSteps(e.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label> Servings:</Form.Label>
                  <Form.Control
                    type="text"
                    name="servings"
                    required
                    value={servings}
                    onChange={(e) => setServings(e.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label> Time:</Form.Label>
                  <Form.Control
                    type="text"
                    name="time"
                    required
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label> Image:</Form.Label>
                  <Form.Control
                    type="text"
                    name="image"
                    required
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                  />
                </Form.Group>
              </Form>
             <p>{message}</p>
              <button
                type="submit"
                className="button button--small"
                value="Submit Recipe"
                onClick={(e) =>
                  handleSubmit(
                    user_id,
                    recName,
                    category,
                    description,
                    ingredients,
                    steps,
                    servings,
                    time,
                    likes,
                    image
                  )
                
                }
              >Create</button>
              
            </Col>
            <Col></Col>
          </Row>
        </Container>
      </section>
    </div>
  );
}