import { ILink } from "@/models/link";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/router";
import Ellipsis from "../ellipsis";
import CopyIcon from "../copy-icon";


interface LinkFormInterface{
	existingLink?: ILink;
	shortLink?: string;
}

export default function LinkForm({existingLink, shortLink}: LinkFormInterface) {
	const router = useRouter();
	const {register, handleSubmit, watch} = useForm<ILink>();
	const endpoint = `/api/links/${existingLink?.shortLink ?? shortLink}`;
	const method = existingLink ? 'PUT' : 'POST';

	const onSubmit =  async (form: ILink) => {
	    const body = JSON.stringify(form);
	    const options = {
	      method,
	      headers: {
	        'Content-Type': 'application/json',
	      },
	      body,
	    };
	    const response = await fetch(endpoint, options);
	    const result = await response.json();

	    if(result.success){
	    	router.push('/');
	    }
	};

	const onDelete = async () => {
	    const response = await fetch(endpoint, {method: 'DELETE'});
	    const result = await response.json();
	    if(result.success){
	    	router.push('/');
	    }
	};

	return (
		<form 
			action={endpoint}
			method={method}
			onSubmit={handleSubmit(onSubmit)}
		>
			<h3>URL</h3>
			{existingLink &&
				<div>
					Current Value: <Ellipsis>{existingLink.fullLink}</Ellipsis>
					<CopyIcon text={existingLink.fullLink}/>
				</div>
			}
			<input {...register('fullLink')}/>
			{/*<h3>Owners</h3>
			{existingLink &&
				<p>Current Value: {'existingLink.owners'}</p>
			}
			<input {...register('owners')}/>
			<h3>Share with:</h3>
			{existingLink &&
				<p>Current Value: {'existingLink.sharedWith'}</p>
			}
			<input {...register('sharedWith')}/>*/}
			<br/><br/>
			<button>Save</button>
			<Link href="/">
				<button type="button">Cancel</button>
			</Link>
			{existingLink &&
				<button type="button" onClick={onDelete}>Delete</button>
			}
		</form>
		)
}
