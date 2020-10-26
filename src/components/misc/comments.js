import React from 'react';
import { Button, Comment, Form } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'

const Comments = () => (
    <>
        <h2 style={{ fontFamily: "Turret Road, cursive"}}>
            Comments
        </h2>
        <hr />
        <Comment.Group>        
            <Comment>
                <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
                <Comment.Content>
                    <Comment.Author as='a'>Matt</Comment.Author>
                    <Comment.Metadata>
                        <div>Today at 5:42PM</div>
                    </Comment.Metadata>
                    <Comment.Text>How artistic!</Comment.Text>
                </Comment.Content>
            </Comment>
            <Form reply>
                <Form.TextArea />
                <Button content='Add Reply' labelPosition='left' icon='edit' primary />
            </Form>
        </Comment.Group>
    </>
)
export default Comments;