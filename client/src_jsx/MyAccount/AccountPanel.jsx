import React from 'react';
import ReactDOM from 'react-dom';
import TabContentHeader from '../TabContentHeader';


export default class AccountPanel extends React.Component {
	constructor(props) {
	    super(props);

	    this.handleChange = this.handleChange.bind(this);
	  }

	handleChange(event) {
		console.log("45516-");
		event.preventDefault();
	}
	render(){		
		return (
			<div>
				<TabContentHeader title="My account" />
				<div className="row">
					<div className="col-md-12">
					<div className="panel panel-info">
						<div className="panel-heading"> Account Settings </div>
						<div className="panel-body">
							<div className="row main">
								<div className="main-login main-center">
									<form className="form-horizontal">
										<div className="form-group">
											<label htmlFor="name" className="cols-sm-2 controlLabel">Your Name</label>
											<div className="cols-sm-10">
												<div className="input-group">
													<span className="input-group-addon"><i className="fa fa-user fa" aria-hidden="true"></i></span>
													
													<input type="text" className="form-control" name="name" id="name" defaultValue="John doe" />
												</div>
											</div>
										</div>

										<div className="form-group">
											<label htmlFor="email" className="cols-sm-2 controlLabel">Your Email</label>
											<div className="cols-sm-10">
												<div className="input-group">
													<span className="input-group-addon"><i className="fa fa-envelope fa" aria-hidden="true"></i></span>
													
													<input type="text" className="form-control" name="email" id="email" defaultValue="Example@gmail.com" />
												</div>
											</div>
										</div>

										<div className="form-group">
											<label htmlFor="username" className="cols-sm-2 controlLabel">Your Username</label>
											<div className="cols-sm-10">
												<div className="input-group">
													<span className="input-group-addon"><i className="fa fa-users fa" aria-hidden="true"></i></span>
													
													<input type="text" className="form-control" name="username" id="username"  defaultValue="john2013" />
												</div>
											</div>
										</div>

										<div className="form-group">
											<label htmlFor="password" className="cols-sm-2 controlLabel"> Enter the actual password</label>
											<div className="cols-sm-10">
												<div className="input-group">
													<span className="input-group-addon"><i className="fa fa-lock fa-lg" aria-hidden="true"></i></span>
													
													<input type="password" className="form-control" name="password" id="password"  placeholder="Your actual Password"/>
												</div>
											</div>
										</div>

										<div className="form-group">
											<label htmlFor="new" className="cols-sm-2 controlLabel">Enter the new password</label>
											<div className="cols-sm-10">
												<div className="input-group">
													<span className="input-group-addon"><i className="fa fa-lock fa-lg" aria-hidden="true"></i></span>
													
													<input type="password" className="form-control" name="new" id="new"  placeholder="New password"/>
												</div>
											</div>
										</div>

										<div className="form-group">
											<label htmlFor="confirm" className="cols-sm-2 controlLabel">Confirm the new Password</label>
											<div className="cols-sm-10">
												<div className="input-group">
													<span className="input-group-addon"><i className="fa fa-lock fa-lg" aria-hidden="true"></i></span>
													
													<input type="password" className="form-control" name="confirm" id="confirm"  placeholder="Confirm your new password"/>
												</div>
											</div>
										</div>

										<div className="form-group ">
											<button type="button" className="btn btn-primary btn-lg btn-block login-button">
												Modify
											</button>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
					</div>
				</div>
			</div>
		);
	}
}