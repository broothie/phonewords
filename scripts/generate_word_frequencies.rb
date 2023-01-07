#! env ruby
require "csv"
require "json"

dictionary = File.read("data/dictionary.txt")
  .split("\n")
  .each_with_object({}) { |word, hash| hash[word] = 0 }

word_freqencies = CSV.open("data/wordFrequency.csv", headers: true)
  .map(&:to_h)
  .reject { |row| row["word"].nil? || row["word"].empty? }
  .map { |row| row.merge("word" => row["word"].downcase) }
  .select { |row| row["word"].chars.all? { |char| ("a".."z").include?(char) } }
  .each_with_object({}) { |row, hash| hash[row["word"]] = row["wordFreq"].to_i }

combined = dictionary.merge(word_freqencies)

File.write("src/assets/word_freqencies.json", combined.to_json)
