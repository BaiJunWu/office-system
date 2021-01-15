import { Post } from 'utils/requestService';

export const GetAppliedPage = (data) => {
  return Post('/workflow/get_applied_page', data);
};
