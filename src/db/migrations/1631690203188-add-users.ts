import { MigrationInterface, QueryRunner, Table } from 'typeorm'

class addUsers1631690203188 implements MigrationInterface {
  name = '1631690203188-add-users'

  up(queryRunner: QueryRunner) {
    return queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          { name: 'id', type: 'uuid', isGenerated: true, generationStrategy: 'uuid', isPrimary: true },
          { name: 'username', type: 'character varying(20)', isUnique: true },
          { name: 'password', type: 'character varying(20)' },
        ],
      }),
    )
  }

  down(queryRunner: QueryRunner) {
    return queryRunner.dropTable('users')
  }
}

export { addUsers1631690203188 }
