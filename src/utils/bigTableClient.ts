import { Bigtable } from '@google-cloud/bigtable';

const bigtable = new Bigtable();
const instance = bigtable.instance('comp-539-bt-shared');

export const urlTable = instance.table('team2');
export const userTable = instance.table('team2-user');
