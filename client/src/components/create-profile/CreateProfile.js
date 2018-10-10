import React, { Component } from 'react';
import { connect } from 'react-redux';

import PropTypes from "prop-types";
import { withRouter} from "react-router-dom";

 import TextFieldGroup from "../common/TextFieldGroup";
 import TextAreaFieldGroup from "../common/TextAreaField";
 import InputGroup from "../common/InputGroup";
import SelectListGroup from "../common/SelectListGroup";

import {createProfile} from "./../../actions/profileActions";



class CreateProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dispaySocialInputs: false,
            handle: "",
            company: "",
            website: "",
            location: "",
            status: "",
            skills: "",
            githubusername: "",
            bio: "",
            twitter: "",
            facebook: "",
            linkedin: "",
            youtube: "",
            instagram: "",
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            })
        }
    }

    onSubmit(e) {
        e.preventDefault();
        console.log("Submit");

        const profileData = {
            handle: this.state.handle,
            company: this.state.company,
            website: this.state.website,
            location: this.state.location,
            status: this.state.status,
            skills: this.state.skills,
            githubusername: this.state.githubusername,
            bio: this.state.bio,
            twitter: this.state.twitter,
            facebook: this.state.facebook,
            linkedin: this.state.linkedin,
            youtube: this.state.youtube,
            instagram: this.state.instagram,
        }

        this.props.createProfile(profileData, this.props.history);
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {

        const { errors, dispaySocialInputs } = this.state;

        let socialInputs;

        if (dispaySocialInputs) {
            socialInputs = (
                <div>
                    <InputGroup
                        placeholder="Twitter Profile URL"
                        name="twitter"
                        icon="fab fa-twitter"
                        value={this.state.twitter}
                        onChange={this.onChange}
                        error={errors.twitter}
                    />

                     <InputGroup
                        placeholder="Youtube Channel URL"
                        name="youtube"
                        icon="fab fa-youtube"
                        value={this.state.youtube}
                        onChange={this.onChange}
                        error={errors.youtube}
                    />


                    <InputGroup
                        placeholder="Facebook Page URL"
                        name="facebook"
                        icon="fab fa-facebook"
                        value={this.state.facebook}
                        onChange={this.onChange}
                        error={errors.facebook}
                    />


                     <InputGroup
                        placeholder="Linkedin Profile URL"
                        name="linkedin"
                        icon="fab fa-linkedin"
                        value={this.state.linkedin}
                        onChange={this.onChange}
                        error={errors.linkedin}
                    />

                     <InputGroup
                        placeholder="Instagram URL"
                        name="instagram"
                        icon="fab fa-instagram"
                        value={this.state.instagram}
                        onChange={this.onChange}
                        error={errors.instagram}
                    />

                </div>
            )
        }

        //Select options for status
        const options = [
            { label: "* select Professional Status", value: 0 },
            { label: "Developer", value: "Developer" },
            { label: "Junior Developer", value: "Junior Developer" },
            { label: "Senior Developer", value: "Senior Developer" },
            { label: "Manager", value: "Manager" },
            { label: "Student or Learning", value: "Student or Learning" },
            { label: "Intern", value: "Intern" },
            {label : "Other", value: "Other"},
        ]

    return (
        <div className="create-profile">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <h1 className="display-4 text-center">
                            Create Your Profile
                        </h1>

                        <p className="lead text-center">
                            Let's get some information to make your profile stand out
                        </p>
                        <small className="d-clock pb-3"> *= required fields</small>
                        <form onSubmit={this.onSubmit}>
                            <TextFieldGroup
                                 placeholder="Profile Handle"
                                name="handle"
                                value={this.state.handle}
                                onChange={this.onChange}
                                error={errors.handle}
                                info="A unique handle for your profile URL. Your fullname, company name, nickname"
                            />

                            <SelectListGroup
                                placeholder="Status"
                                name="status"
                                value={this.state.status}
                                options= {options}
                                onChange={this.onChange}
                                error={errors.status}
                                info="Give us an idea of where you are at in your career"
                            />

                            <TextFieldGroup
                                placeholder="Company"
                                name="company"
                                value={this.state.company}
                                onChange={this.onChange}
                                error={errors.company}
                                info="Could be your own company or one that you work for"
                            />

                            <TextFieldGroup
                                placeholder="Website"
                                name="website"
                                value={this.state.website}
                                onChange={this.onChange}
                                error={errors.website}
                                info="Could be your own company or one that you work for"
                            />

                            <TextFieldGroup
                                placeholder="Location"
                                name="location"
                                value={this.state.location}
                                onChange={this.onChange}
                                error={errors.location}
                                info="Could be your own company or one that you work for"
                            />

                            <TextFieldGroup
                                placeholder="Skills"
                                name="skills"
                                value={this.state.skills}
                                onChange={this.onChange}
                                error={errors.skills}
                                info="Please us comma separated values (eg. HML,CSS, Java)"
                            />

                             <TextFieldGroup
                                placeholder="Github UserName"
                                name="githubusername"
                                value={this.state.githubusername}
                                onChange={this.onChange}
                                error={errors.githubusername}
                                info="If you want your latest repos and a Github link, include your username"
                            />

                             <TextAreaFieldGroup
                                placeholder="Short Bio"
                                name="bio"
                                value={this.state.bio}
                                onChange={this.onChange}
                                error={errors.bio}
                                info="Tell us a little about yourself"
                            />

                            <div className="mb-3">
                                <button type="button" className="btn btn-light" onClick={() => {
                                    this.setState(prevState => ({
                                        dispaySocialInputs: !prevState.dispaySocialInputs
                                    }))
                                }}>
                                    Add Social Links
                                </button>

                                <span className="text-muted">Optional</span>
                            </div>

                            {socialInputs}

                            <input type="submit" value="Submit" className="btn btn-info btn-block nt-4"  />

                        </form>
                    </div>
                </div>
            </div>
      </div>
    )
  }
}


CreateProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}


function mapStateToProps(state) {
    return {
        profile: state.profile,
        errors: state.errors
    }
}

export default connect(mapStateToProps, { createProfile })(
  withRouter(CreateProfile)
);