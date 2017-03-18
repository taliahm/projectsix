import React from 'react';

export default (props) => {
	const byTimeArray = props.data.filter((item) => {
		return item.frequency === props.frequency
	});
	return (
		<div>
			<h6>You should be cleaning this every {props.frequency}  months</h6>
				{byTimeArray.map((item, i) => {
					let descriptionKey = item.description.replace(" ", "");
					if(item.status === 'completed') {
					return (
							<li key={descriptionKey}>
								<input name={item.description} checked
									   onChange={(e)=> props.clickFunction(e)} 
									   type="checkbox" 
									   id={`${item.description}`}/>
								<label htmlFor={`${item.description}`}>
									{item.description}
								</label>
							</li>
						)
					}
					else {
						return (
								<li key={descriptionKey}>
									<input name={item.description}
										   onChange={(e)=> props.clickFunction(e)} 
										   type="checkbox" 
										   id={`${item.description}`}/>
									<label htmlFor={`${item.description}`}>
										{item.description}
									</label>
									<a onClick={(e) => props.removeFunction(e)} className={item.description} name={item.description} href="#">Does Not Apply to Me</a>
								</li>
							)
					}
				})}
		</div>
		)
}
