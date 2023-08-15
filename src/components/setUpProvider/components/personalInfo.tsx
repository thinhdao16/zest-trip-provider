import { FormEvent } from 'react';
import { Input } from './input';
import { UserInfo } from 'AppTypes';
import { AiOutlineLock } from 'react-icons/ai';

interface PersonalInfoProps {
	userInfo: UserInfo;
	updateUserInfo: (userInfo: UserInfo) => void;
	showRequired: boolean;
}

export const PersonalInfo = ({
	userInfo,
	updateUserInfo,
	// showRequired,
}: PersonalInfoProps) => {
	const handlePersonalInfo = (
		event: FormEvent<HTMLInputElement>,
		key: keyof UserInfo
	) => {
		const updatedUserInfo = { ...userInfo };
		updatedUserInfo[key] = event.currentTarget.value;
		updateUserInfo(updatedUserInfo);
	};
	return (
		<>
			<Input
				labels="Company’s legal name"
				placeholder="e.g. Stephen King"
				icon={<AiOutlineLock />}
				// showRequired={ userInfo.nameCompany}
				value={userInfo.nameCompany}
				onChange={(e: FormEvent<HTMLInputElement>) =>
					handlePersonalInfo(e, 'nameCompany')
				}
			/>

			<Input
				labels="Region"
				placeholder="e.g. Stephen King"
				icon={<AiOutlineLock />}
				value={userInfo.region}
				onChange={(e: FormEvent<HTMLInputElement>) =>
					handlePersonalInfo(e, 'region')
				}
			/>
			<Input
				labels="Address"
				placeholder="e.g. Stephen King"
				icon={<AiOutlineLock />}
				value={userInfo.address}
				onChange={(e: FormEvent<HTMLInputElement>) =>
					handlePersonalInfo(e, 'address')
				}
			/>
			<Input
				labels="Company Website"
				placeholder="e.g. Stephen King"
				icon={<AiOutlineLock />}
				value={userInfo.webCompnany}
				onChange={(e: FormEvent<HTMLInputElement>) =>
					handlePersonalInfo(e, 'webCompnany')
				}
			/>
			<Input
				labels="Social media"
				placeholder="e.g. Stephen King"
				icon={<AiOutlineLock />}
				value={userInfo.mediaSocial}
				onChange={(e: FormEvent<HTMLInputElement>) =>
					handlePersonalInfo(e, 'mediaSocial')
				}
			/>
			
			</>	
	);
};
