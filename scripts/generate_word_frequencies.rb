#! env ruby
require "csv"
require "json"

word_freqencies =
  case ARGV.first
  when "wordFrequency"
    CSV.open("data/wordFrequency.csv", headers: true)
      .map(&:to_h)
      .reject { |row| row["word"].nil? || row["word"].empty? }
      .map { |row| row.merge("word" => row["word"].downcase) }
      .select { |row| row["word"].chars.all? { |char| ("a".."z").include?(char) } }
      .each_with_object({}) { |row, hash| hash[row["word"]] = row["wordFreq"].to_i }
  when "dictionary"
    File.read("data/dictionary.txt")
      .split("\n")
      .each_with_object({}) { |word, hash| hash[word] = 1 }
  end

File.write("src/assets/word_freqencies.json", word_freqencies.to_json)
