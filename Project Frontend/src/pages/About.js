import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import Layout from "./../components/Layout/Layout";

const About = () => {
  const teamMembers = [
    { name: 'Ketan Darekar', role: 'Backend Designer', description: 'Hi guys I am Ketan from CDAC MUMBAI(JUHU)', image: 'ketan.jpg' },
    { name: 'Rakesh Uikey', role: 'Frontend Designer', description: 'Hi guys I am Rakesh from CDAC MUMBAI(JUHU)', image: 'rakesh.jpg' },
    { name: 'Sumit Wagh', role: 'Frontend Designer', description: 'Hi guys I am Sumit from CDAC MUMBAI(KHARGHAR)', image: 'sumit.jpg' },
  ];

  return (
    <Layout>
      <div>
        <h2>Our Team</h2>
        <Row>
          {teamMembers.map((member, index) => (
            <Col key={index} lg={4} md={6} sm={12} className="mb-4">
              <Card>
                <Card.Img variant="top" src={`images/${member.image}`} alt={member.name} />
                <Card.Body>
                  <Card.Title>{member.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{member.role}</Card.Subtitle>
                  <Card.Text>{member.description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </Layout>
  );
};

export default About;

