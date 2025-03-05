import { supabase } from '../../../supabase/supabaseClient';

export const insertTestData = async () => {
    const { data, error } = await supabase
      .from('test_table')
      .insert([{ name: '테스트 데이터' }]);
    
    if (error) {
      console.error('데이터 삽입 에러:', error);
    } else {
      console.log('데이터 삽입 성공:', data);
    }
};
  
export const fetchTestData = async () => {
    const { data, error } = await supabase
      .from('test_table')
      .select('*');
    
    if (error) {
      console.error('데이터 조회 에러:', error);
    } else {
      console.log('조회된 데이터:', data);
    }
};
  