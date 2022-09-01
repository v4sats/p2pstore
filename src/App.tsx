import axios from "axios";
import React, { useState, useEffect } from 'react';
import styles from './App.module.scss';
import { Col, Row } from 'react-bootstrap';
import { NavbarLayout } from './Main/Navbar/Navbar';
import { OffersBar, FuncProps } from './Main/OffersBar/OffersBar';
import { Profile } from './Main/Profile/Profile';
import { Feed } from './Main/Feed/Feed';


export const App = () => {
    const [msgId, setMsgId] = useState<number>(0);
    const [me] = useState({
        username: 'azizoid',
        fullName: 'Aziz Shahhuseynov',
        image: 'https://picsum.photos/56',
    });
    const [msg, setMsg] = useState<any>({});
    const [fromUser, setFromUser] = useState<any>({});

    useEffect(() => {
        const getMsg = async () => {
          try {
              let response = await axios.get(
                `http://localhost:8001/telegram/@bitcoinp2pmarketplace?msg_id=${msgId}`
              );
              setMsg(response.data);
              setFromUser(response.data.from_user);
              console.log("message", response);
          } catch(err) {
              console.log(err);
          }
        };
        getMsg();
    }, [msgId]);


    const setId = (id: number) => {
      console.log("msgId", id);      
      setMsgId(id);
    };

    return (
        <div className={styles.App}>
            <Row>
                <NavbarLayout />
            </Row>

            <Row className={styles.main}>
                <Col md={{ offset: 2, span: 6 }}>
                    <OffersBar handleMsgIdChange={setId}/>
                    <Feed msg={msg}/>
                </Col>
                <Col md={{ span: 3 }}>
                    <Profile user={fromUser} />
                </Col>
            </Row>
        </div>
    );
};

export default App;
