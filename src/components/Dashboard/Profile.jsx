import React, { useState, useEffect } from "react";
import { Container, Grid } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import Section from "./Section";
import Loading from "./Loading";
import About from "./Forms/UserProfileForm/ProfileCards/About";
import Education from "./Forms/UserProfileForm/ProfileCards/Education";
import Documents from "./Forms/UserProfileForm/ProfileCards/Documents";
import Questions from "./Forms/UserProfileForm/ProfileCards/Questions";
import Register from "./Forms/UserProfileForm/ProfileCards/Register";
import Swag from "./Forms/UserProfileForm/ProfileCards/Swag";
import Team from "./Forms/UserProfileForm/ProfileCards/TeamMaker";
// import Short from "./Forms/UserProfileForm/ProfileCards/ShortProfileForm";
import Communications from "./Forms/UserProfileForm/ProfileCards/Communications";
import { ProfileType } from "../Profile";
import PropTypes from "prop-types";
import { defaults } from "../../Defaults";


const Profile = (props) => {
    const [loading, setLoading] = useState("Loading your personal profile...");
    const [user, setUser] = useState({});
    const [openDetails, setOpenDetails] = useState(false);
    const [profileMSG, setProfileMSG] = useState({});
    const [teamUser, setTeamUser] = useState({});
    const [teamProfile, setTeamProfile] = useState({});
    
    useEffect(() => {
        async function get_profile() {
            let teamRU_User =  await props.profile.getTeamUser();
            if (teamRU_User.response) setTeamUser(teamRU_User.response);
    
            if (teamRU_User.response.hasateam) {
                let teamRU_Profile = await props.profile.getTeam(teamRU_User.response.team_id);
                if (teamRU_Profile.response) setTeamProfile(teamRU_Profile.response);
            }
            setLoading(false);
        }

        if (props.magic) {
            props.profile.Eat(props.magic, (msg) => {
                if (msg) {
                    console.error(msg);
                    setProfileMSG({ color: "warning", value: msg });
                } else {
                    setProfileMSG({ color: "info", value: "Magic link applied!" });
                }
                props.clearMagic();
            });
        }
        props.profile.Get((msg, data) => {
            if (msg) {
                console.error(msg);
            } else {
                if (data) {
                    delete data.auth;
                    setUser(data);
                    get_profile();
                    setOpenDetails((data.registration_status === "unregistered"));
                }
            }
        });
        
        
    }, []);

    

    if (!props.profile.isLoggedIn) {
        return (<Redirect to="/login"/>);
    }
    if (loading) {
        return (<Loading text={loading} />);
    }
    let set_user = user;
    set_user.phone_number = set_user.phone_number || "";
    set_user.ethnicity = set_user.ethnicity || "";
    set_user.how_you_heard_about_hackru = set_user.how_you_heard_about_hackru || "";
    set_user.reasons = set_user.reasons || "";
    let mobile = props.isMobile;
    if (profileMSG === openDetails) {
        console.log("correct");
    }
    return(
        <Container maxWidth={false} 
            style={{paddingTop: 90 }}>
            <Grid container>
                <Grid xs={12}>
                    <Section title="Register"
                        subtitle="Introduce yourself, don't be shy!"
                        isOpen={true} /* replaced this.state.openDetails to force true*/>
                        <Register mobile={mobile}
                            user={set_user}
                            profile={props.profile}
                        />
                    </Section>
                </Grid>
                <Grid item
                    xs={12}
                    sm={12}
                    md={6}>
                    <Section title="About"
                        subtitle="Introduce yourself, don't be shy!"
                        isOpen={true} /* replaced this.state.openDetails to force true*/>
                        <About mobile={mobile}
                            user={set_user}
                            profile={props.profile}
                        />
                    </Section>
                    <Section title="Education"
                        subtitle="Introduce yourself, don't be shy!"
                        isOpen={true} /* replaced this.state.openDetails to force true*/>
                        <Education mobile={mobile}
                            user={set_user}
                            profile={props.profile}
                        />
                    </Section>
                    <Section title="Documents"
                        subtitle="Introduce yourself, don't be shy!"
                        isOpen={true} /* replaced this.state.openDetails to force true*/>
                        <Documents mobile={mobile}
                            user={set_user}
                            profile={props.profile}
                        />
                    </Section>
                </Grid>
                <Grid item
                    xs={12}
                    sm={12}
                    md={6}>
                    <Section title="A Few Questions"
                        subtitle="Introduce yourself, don't be shy!"
                        isOpen={true} /* replaced this.state.openDetails to force true*/>
                        <Questions mobile={mobile}
                            user={set_user}
                            profile={props.profile}
                        />
                    </Section>
                    <Section title="Communications"
                        subtitle="Introduce yourself, don't be shy!"
                        isOpen={true} /* replaced this.state.openDetails to force true*/>
                        <Communications mobile={mobile}
                            user={set_user}
                            profile={props.profile}
                        />
                    </Section>
                    <Section title="Swag"
                        subtitle="Introduce yourself, don't be shy!"
                        isOpen={true} /* replaced this.state.openDetails to force true*/>
                        <Swag
                            user={set_user}
                            profile={props.profile}
                        />
                    </Section>
                </Grid>
                { defaults.teamru ?
                    <Grid xs={12}>
                        <Section title="Make a Team!"
                            subtitle="Introduce yourself, don't be shy!"
                            isOpen={true} /* replaced this.state.openDetails to force true*/>
                            <Team
                                mobile={mobile}
                                user={set_user}
                                hasTeam={teamUser.team_id !== ""}
                                teamProfile={teamProfile}
                                team={teamUser}
                                profile={props.profile}
                            />
                        </Section>
                    </Grid> : <b></b>}

            </Grid>
        </Container>
    );

};


Profile.propTypes = {
    clearMagic: PropTypes.func,
    isMobile: PropTypes.bool,
    magic: PropTypes.string,
    profile: ProfileType,
};

export default Profile;
