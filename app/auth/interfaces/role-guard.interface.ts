import { screenIdType } from '../../routes/screen-id.interface';
import { RoleEnum } from '../enums/role.enum';

export interface IRoleGuard {
  role: RoleType;
  id: screenIdType;
}

type RoleType = keyof typeof RoleEnum;
