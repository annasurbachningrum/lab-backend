import { ApiProperty } from "@nestjs/swagger";
import { IsString, Matches, Length, IsNotEmpty } from "class-validator";

export class LoginUserDTO {
  @ApiProperty({
    description: 'UserName Pengguna Untuk Login',
    type: String,
    example: 'ANNASURBACHNINGRUM'
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^\S*$/i, { message: 'Username tidak boleh mengandung spasi' })
  @Length(3, 100, { message: 'Username harus memiliki panjang antara 3 hingga 100 karakter' })
  username: string;

  @ApiProperty({
    description: 'Password pengguna untuk login',
    type: String,
    example: 'annas120604',
  })
  @IsString()
  @IsNotEmpty({ message: 'Password tidak boleh kosong' })
  @Matches(/^\S*$/i)
  @Length(9, 100, { message: 'Password harus memiliki panjang minimal 8 karakter' })
  password: string;
}
