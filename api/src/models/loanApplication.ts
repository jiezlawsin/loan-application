import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  Default,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';

export enum LoanStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

@Table({
  tableName: 'loan_applications',
})
export default class LoanApplication extends Model {
  @PrimaryKey
  @Default(() => uuidv4())
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare applicantName: string;

  @Column({
    type: DataType.DECIMAL(15, 2),
    allowNull: false,
  })
  declare requestedAmount: number;

  @Column({
    type: DataType.ENUM(...Object.values(LoanStatus)),
    allowNull: false,
    defaultValue: LoanStatus.PENDING,
  })
  declare status: LoanStatus;

  @CreatedAt
  @Column({
    type: DataType.DATE,
  })
  declare createdAt: Date;

  @UpdatedAt
  @Column({
    type: DataType.DATE,
  })
  declare updatedAt: Date;
} 