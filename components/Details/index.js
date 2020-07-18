import React, { Component } from 'react';
import { Container, TypeTitle, TypeDescription, TypeImage, RequestButton, RequestButtonText } from './styles';
import uberx from '../../assets/uberx.png';
class Details extends Component {
    render() {
        return (
            <Container>
                <TypeTitle>Popular</TypeTitle>
                <TypeDescription>Viagens baratas para o dia a dia</TypeDescription>

                <TypeImage source={uberx} />
                <TypeDescription>R$ 6,00</TypeDescription>

                <RequestButton onPress={() => { }}>
                    <RequestButtonText>SOLICITAR UBERX</RequestButtonText>
                </RequestButton>
            </Container>
        );

    }
}

export default Details;