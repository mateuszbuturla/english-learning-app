import React from 'react';
import styled from 'styled-components';

import PasswordValidation from '../../../validation/PasswordValidation';
import RepeatPasswordValidation from '../../../validation/RepeatPasswordValidation';

const Form = styled.form`
    margin-top: 20px;
    width: 90%;
    max-width: 300px;
    box-shadow: 0px 0px 5px 2px #bababa;
    padding: 30px 20px;
    box-sizing: border-box;
    margin-bottom: 30px;
`;

const H2 = styled.h2`
    font-size: 25px;
    margin-bottom: 20px
`;

const Input = styled.input`
    border: 0;
    border-bottom: 1px solid #000000;
    font-size: 20px;
    width: 90%;
    margin-bottom: 20px;
`;

const Button = styled.input`
    padding: 10px 40px;
    border: 0;
    border-radius: 100px;
    color: #fff;
    cursor: pointer;
    background: linear-gradient(165deg, rgba(92, 30, 219, 1),rgba(21, 117, 191, 1));
    :focus,
    :active {
       outline: 0;
    }
`;

const Message = styled.p`
    margin-bottom: 20px;
`;

const ErrorLabel = styled.div`
    margin-bottom: 20px;
    margin-top: -20px;
    color: #d11b1b;
`;

class DashboardSettingChangePassword extends React.Component {

    state = {
        newPassword: '',
        newPasswordRepeat: '',
        password: '',
        newPasswordValid: true,
        newPasswordRepeatValiad: true,
        passwordValid: true,
        message: ''
    }

    async validInput(inputId, inputValue) {
        switch (inputId) {
            case 'newPassword':
                const { newPasswordRepeat } = this.state;
                this.setState({ newPasswordValid: PasswordValidation(inputValue) })
                this.setState({ newPasswordRepeatValiad: RepeatPasswordValidation(inputValue, newPasswordRepeat) })
                break;
            case 'newPasswordRepeat':
                const { newPassword } = this.state;
                this.setState({ newPasswordRepeatValiad: RepeatPasswordValidation(inputValue, newPassword) })
                break;
            case 'password':
                this.setState({ passwordValid: inputValue.length > 0 ? true : false })
                break;
            default:
                break;
        }
    }

    handleInputChange(e) {
        this.setState({ [e.target.id]: e.target.value });
        this.validInput(e.target.id, e.target.value);
    }

    submitChangePasswordForm(e) {
        e.preventDefault();
        const { newPassword, password, newPasswordValid, newPasswordRepeatValiad, passwordValid } = this.state;
        const { config, user } = this.props;

        if (newPasswordValid && newPasswordRepeatValiad && passwordValid) {
            try {
                fetch(`${config.api}/api/user/changepassword/${user._id}/${password}/${newPassword}`, { method: 'POST' })
                    .then(r => r.json())
                    .then(r => {
                        if (r.status === 'correct') {
                            this.setState({ message: 'Hasło zostało zmienione', newPassword: '', newPasswordRepeat: '', password: '' })
                        }
                        else if (r.status === 'incorrect') {
                            this.setState({ message: 'Nie prawidłowe dane', password: '' })
                        }
                    })
            }
            catch {
                this.setState({ message: 'Wystąpił problem po stronie serwera proszę spróbować ponownie później' })
            }
        }
    }

    render() {
        const { newPassword, newPasswordRepeat, password, message, newPasswordValid, newPasswordRepeatValiad, passwordValid } = this.state;

        return (
            <Form onSubmit={this.submitChangePasswordForm.bind(this)}>
                <H2>Zmiana hasła</H2>
                {message !== '' && <Message>{message}</Message>}
                <Input type="password"
                    placeholder="Nowe hasło"
                    value={newPassword}
                    onChange={this.handleInputChange.bind(this)}
                    id="newPassword"
                />
                {
                    newPasswordValid === false &&
                    <ErrorLabel>
                        <p>Za krótkie hasło</p>
                    </ErrorLabel>
                }
                <Input type="password"
                    placeholder="Powtórz hasło"
                    value={newPasswordRepeat}
                    onChange={this.handleInputChange.bind(this)}
                    id="newPasswordRepeat"
                />
                {
                    newPasswordRepeatValiad === false &&
                    <ErrorLabel>
                        <p>Hasła nie są identyczne</p>
                    </ErrorLabel>
                }
                <Input type="password"
                    placeholder="Hasło"
                    value={password}
                    onChange={this.handleInputChange.bind(this)}
                    id="password"
                />
                {
                    passwordValid === false &&
                    <ErrorLabel>
                        <p>To pole nie może być puste</p>
                    </ErrorLabel>
                }
                <Button type="submit"
                    value="Zapisz zmiany"
                />
            </Form>
        );
    }
}

export default DashboardSettingChangePassword;
