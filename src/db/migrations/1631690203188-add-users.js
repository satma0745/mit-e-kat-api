const { Table } = require('typeorm')

class addUsers1631690203188 {
  name = '1631690203188-add-users'

  up(queryRunner) {
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

  down(queryRunner) {
    return queryRunner.dropTable('users')
  }
}

module.exports = addUsers1631690203188
