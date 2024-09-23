import styled from "styled-components";
import { FormContainer, Input, Label } from "./Form";
import { StyledButton } from "./StyledButton.js";
import { Fragment } from "react";

export default function Comments({
  locationName,
  comments,
  onSubmit,
  onDelete,
}) {
  const Article = styled.article`
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 5px solid black;
    border-radius: 0.8rem;
    padding: 0.5rem;
    text-align: center;
    p {
      border-bottom: solid 1px black;
      padding: 20px;
    }
  `;

  // function handleSubmitComment(e) {
  //   e.preventDefault();
  // }

  return (
    <Article>
      <FormContainer onSubmit={onSubmit}>
        <Label htmlFor="name">Your Name</Label>
        <Input type="text" name="name" placeholder="name" />
        <Label htmlFor="comment">Your Comment</Label>
        <Input type="text" name="comment" placeholder="comment here..." />
        <StyledButton type="submit">Send</StyledButton>
      </FormContainer>
      {comments && (
        <>
          <h1> {comments.length} fans commented on this place:</h1>
          {comments.map(({ name, comment, _id }, idx) => {
            return (
              <Fragment key={_id}>
                <p>
                  <small>
                    <strong>{name}</strong> commented on {locationName}
                  </small>
                </p>
                <span>{comment}</span>
                <StyledButton
                  type="button"
                  variant="delete"
                  onClick={() => onDelete(_id)}
                >
                  Delete Comment
                </StyledButton>
              </Fragment>
            );
          })}
        </>
      )}
    </Article>
  );
}
